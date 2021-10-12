import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(entry: { data: string[] }, metadata: ArgumentMetadata) {
    console.log(entry.data);

    if (metadata.type === 'body') {
      return entry.data.map((element) => element.toUpperCase()).join("-");
    }
    console.log(metadata);

    return entry;
  }
}
