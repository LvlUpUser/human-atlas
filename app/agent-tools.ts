import type {Atlas,Concept} from './anatomy';
import {normalizeForSearch,translateAnatomicalName} from './anatomy-es';
type Tool={name:string;description:string;inputSchema:object;annotations:{readOnlyHint:boolean};execute:(input:unknown)=>unknown};
function record(input:unknown):Record<string,unknown>{if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Se esperaba un objeto.');return input as Record<string,unknown>;}
export function atlasTools(atlas:Atlas,inspect:(concept:Concept)=>void):Tool[]{return [
 {name:'find_anatomy',description:'Busca estructuras anatómicas por nombre en español, nombre original o identificador del atlas.',inputSchema:{type:'object',properties:{query:{type:'string',minLength:1}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true},execute(input){const data=record(input);if(typeof data.query!=='string'||!data.query.trim())throw new Error('Se requiere una consulta no vacía.');const q=normalizeForSearch(data.query.trim());return atlas.concepts.filter(c=>normalizeForSearch(c.name).includes(q)||normalizeForSearch(translateAnatomicalName(c.name)).includes(q)||c.id.toLowerCase().includes(q)).slice(0,30).map(c=>({id:c.id,nombre:translateAnatomicalName(c.name),nombreOriginal:c.name,piezas:c.elements.length}));}},
 {name:'inspect_anatomical_structure',description:'Selecciona un concepto del atlas 3D y abre su panel de detalles.',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){const data=record(input);if(typeof data.id!=='string')throw new Error('Se requiere un identificador del atlas.');const concept=atlas.concepts.find(c=>c.id===data.id);if(!concept)throw new Error('Esa estructura no está presente en este atlas.');inspect(concept);return {id:concept.id,nombre:translateAnatomicalName(concept.name),nombreOriginal:concept.name,piezasSeleccionadas:concept.elements.length};}}
 ];}
export function registerAtlasTools(atlas:Atlas,inspect:(concept:Concept)=>void){
 const context=(document as Document&{modelContext?:{registerTool:(tool:Tool,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
 if(!context?.registerTool)return;const lifecycle=new AbortController();
 for(const tool of atlasTools(atlas,inspect)){try{void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{/* Capacidad opcional del navegador; la interfaz visible sigue funcionando. */}}
 return()=>lifecycle.abort();
}
