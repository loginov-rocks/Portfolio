import Busboy from 'busboy';
import crypto from 'crypto';
import fs from 'fs';
import { IncomingHttpHeaders } from 'http';
import os from 'os';
import path from 'path';

// TODO: Function shouldn't return any response.
interface UpdateLogosResponse {
  symbols: Array<string>;
  tempFilePaths: Array<string>;
}

export class UpdateLogos {
  // eslint-disable-next-line class-methods-use-this
  public patch(headers: IncomingHttpHeaders, rawBody: Buffer): Promise<UpdateLogosResponse> {
    const symbols: Array<string> = [];
    const tempFilePaths: Array<string> = [];

    return new Promise<Array<Promise<void>>>((resolve) => {
      const busboy = new Busboy({ headers });
      const fileWrites: Array<Promise<void>> = [];
      const tmpdir = os.tmpdir();

      // Process each non-file field received.
      busboy.on('field', (fieldName, value) => {
        // Process only expected fields.
        if (fieldName === 'symbol') {
          symbols.push(value);
        }
      });

      // Process each file received.
      busboy.on('file', (fieldName, file) => {
        // Skip unexpected fields.
        if (fieldName !== 'logo') {
          return;
        }

        const tempFileName = crypto.randomBytes(20).toString('hex');
        const tempFilePath = path.join(tmpdir, tempFileName);

        tempFilePaths.push(tempFilePath);

        const writeStream = fs.createWriteStream(tempFilePath);
        file.pipe(writeStream);

        // Create a promise for file write.
        const promise = new Promise<void>((resolveFileWrite, rejectFileWrite) => {
          file.on('end', () => {
            writeStream.end();
          });
          writeStream.on('finish', resolveFileWrite);
          writeStream.on('error', rejectFileWrite);
        });

        fileWrites.push(promise);
      });

      // Resolve current promise when all uploaded files are processed by Busboy.
      busboy.on('finish', () => {
        resolve(fileWrites);
      });

      busboy.end(rawBody);
    })
      // Wait for the disk writes to complete.
      .then((fileWrites) => Promise.all(fileWrites))
      .then(() => {
        // TODO: Upload temp files to Storage.
        // TODO: Update stocks collections with uploaded logos URLs.

        // Remove temp files.
        tempFilePaths.forEach((filePath) => fs.unlinkSync(filePath));

        return { symbols, tempFilePaths };
      });
  }
}
