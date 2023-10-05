const core = require('@actions/core')
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

function parseInput () {
  try {
    return {
      region: core.getInput('region', { required: true }),
      accessKey: core.getInput('access_key', { required: true }),
      secretAccessKey: core.getInput('secret_access_key', { required: true }),
      bucket: core.getInput('bucket', { required: true }),
      expiresIn: parseInt(core.getInput('expires_in', { required: false })),
      path: core.getInput('path', { required: true })
    }
  } catch (error) {
    core.setFailed('error parsing user input: ', error)
  }
}

async function main () {
  const { region, accessKey, secretAccessKey, bucket, expiresIn, path } = parseInput()

  try {
    const client = new S3Client({
      region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey
      }
    })

    const url = await getSignedUrl(client,
      new GetObjectCommand({
        Bucket: bucket,
        Key: path
      }), { expiresIn })

    core.setOutput('url', url)
  } catch (error) {
    core.setFailed('error generating a presigned url: ', error)
  }
}

main()
