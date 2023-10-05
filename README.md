# s3-pre-signed-url

[![Release](https://img.shields.io/github/v/release/anton-yurchenko/s3-pre-signed-url)](https://github.com/anton-yurchenko/s3-pre-signed-url/releases/latest)
[![Release](https://github.com/anton-yurchenko/s3-pre-signed-url/actions/workflows/release.yml/badge.svg)](https://github.com/anton-yurchenko/s3-pre-signed-url/actions/workflows/release.yml)
[![License](https://img.shields.io/github/license/anton-yurchenko/s3-pre-signed-url)](LICENSE.md)

## Overview

GitHub Action to generate an AWS S3 PreSigned URL

```yaml
      - name: Generate S3 PreSigned URL
        uses: anton-yurchenko/s3-pre-signed-url@v1
        id: s3
        with:
          access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          bucket: ${{ env.S3_BUCKET_NAME }}
          path: artifacts/bin/${{ env.FILENAME }}

      - run: echo ${{ steps.s3.outputs.url }}
```

## Configuration

| Input | Default Value | Description |
|:---------:|:-------------:|:-----------:|
| `region` | `us-east-1` | S3 bucket region |
| `access_key` | none | IAM User access key |
| `secret_access_key` | none | IAM User secret access key |
| `bucket`  | none | S3 bucket name |
| `path`  | none | Filepath (for example: artifacts/app.exe) |
| `expires_in`  | `"300"` | Number of seconds until the pre-signed URL expires |

| Output | Description |
|:------:|:-----------:|
| `url` | PreSigned URL |

## Remarks

- This action has multiple tags: `latest / v1 / v1.2 / v1.2.3`. You may lock to a certain version instead of using **latest**.  
(*Recommended to lock against a major version, for example* `v1`)

## License

[MIT](LICENSE.md) © 2023-present Anton Yurchenko
