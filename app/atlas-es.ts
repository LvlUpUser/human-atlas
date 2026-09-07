import type {Atlas} from './anatomy';
import {translateAnatomicalName} from './anatomy-es';

export const ORIGINAL_MODEL_BASE='https://raw.githubusercontent.com/ashemag/human-atlas/main/public/models/';
export const ORIGINAL_ATLAS_URL=`${ORIGINAL_MODEL_BASE}atlas.json`;

function assetUrl(value?:string){
 if(!value)return value;
 const file=value.split('/').pop();
 return file?`${ORIGINAL_MODEL_BASE}${file}`:value;
}

export function localizeAtlas(source:Atlas,remoteAssets=false):Atlas{
 return {
  ...source,
  parts:source.parts.map(part=>({...part,name:translateAnatomicalName(part.name)})),
  concepts:source.concepts,
  chunks:source.chunks.map(chunk=>remoteAssets?{...chunk,url:assetUrl(chunk.url)!,gzip:assetUrl(chunk.gzip)}:chunk),
 };
}
