export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Esqueleto',color:'#e2d9ba',description:'Los huesos forman la estructura de soporte del cuerpo, protegen los órganos y proporcionan puntos de inserción para los músculos. Su tejido interno también almacena minerales y produce células sanguíneas.'},
 {id:'muscular',name:'Músculos',color:'#a85b50',description:'Los músculos esqueléticos generan movimiento al traccionar sobre sus inserciones. Junto con los tendones, mueven las articulaciones, estabilizan la postura y producen calor.'},
 {id:'cardiac',name:'Corazón',color:'#b96760',description:'El corazón es una bomba muscular con cuatro cavidades. Sus válvulas dirigen la sangre hacia delante a través de los circuitos pulmonar y sistémico.'},
 {id:'sensory',name:'Órganos sensoriales',color:'#b0c8ce',description:'Estas estructuras participan en los sentidos especiales, como la visión, la audición y el equilibrio. Sus tejidos especializados detectan estímulos y trabajan con el sistema nervioso para transmitir información.'},
 {id:'arterial',name:'Arterias',color:'#c05245',description:'El corazón impulsa la sangre a través de la circulación. Las arterias transportan la sangre desde el corazón hacia los tejidos o, en la circulación pulmonar, hacia los pulmones.'},
 {id:'venous',name:'Venas',color:'#527c9f',description:'Las venas devuelven la sangre hacia el corazón. Las redes superficiales y profundas recogen la sangre de los tejidos; las venas pulmonares llevan sangre oxigenada desde los pulmones al corazón.'},
 {id:'nervous',name:'Sistema nervioso',color:'#d8b565',description:'El cerebro, la médula espinal y los nervios periféricos transmiten y procesan señales. Intervienen en la sensibilidad, el movimiento, la coordinación y la regulación automática de las funciones corporales.'},
 {id:'respiratory',name:'Sistema respiratorio',color:'#b98991',description:'Las vías respiratorias conducen el aire hasta los pulmones, donde el oxígeno y el dióxido de carbono se intercambian entre el aire y la sangre. La respiración depende de cambios de presión producidos por los músculos respiratorios.'},
 {id:'digestive',name:'Sistema digestivo',color:'#b8916b',description:'El aparato digestivo descompone los alimentos, absorbe nutrientes y agua y desplaza los residuos. Los órganos accesorios aportan bilis y enzimas digestivas.'},
 {id:'urinary',name:'Sistema urinario',color:'#b47961',description:'Los riñones filtran la sangre y regulan el equilibrio de líquidos, electrolitos y ácido base. La orina viaja por los uréteres hasta la vejiga y sale a través de la uretra.'},
 {id:'lymphatic',name:'Sistema linfático',color:'#879f7c',description:'Los vasos linfáticos devuelven a la circulación el exceso de líquido de los tejidos. Los ganglios linfáticos y otros órganos linfoides participan en la vigilancia y respuesta inmunitaria.'},
 {id:'endocrine',name:'Sistema endocrino',color:'#c5a09a',description:'Los órganos endocrinos liberan hormonas a la sangre para coordinar procesos como el metabolismo, el crecimiento, la respuesta al estrés y la reproducción.'},
 {id:'reproductive',name:'Sistema reproductor',color:'#bda098',description:'Las estructuras reproductoras masculinas representadas participan en la producción, maduración y transporte de espermatozoides y en la producción de hormonas sexuales.'},
 {id:'integumentary',name:'Superficie corporal',color:'#ba9b7d',description:'La superficie corporal proporciona una referencia anatómica externa. El sistema tegumentario forma una barrera protectora y participa en la sensibilidad y la regulación de la temperatura.'},
 {id:'connective',name:'Tejido conectivo',color:'#aec3bb',description:'El cartílago, los ligamentos y otros tejidos conectivos sostienen, conectan y separan estructuras. Entre sus funciones están estabilizar las articulaciones y distribuir las cargas mecánicas.'},
];
export interface Part {id:string;name:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;elements:string[]}
export interface Atlas {version:string;sex?:'male';source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];
export const EXPLANATIONS:Record<string,string> = {
 'heart':'Una bomba muscular situada en el tórax. Su lado derecho envía sangre a los pulmones y el izquierdo la impulsa a través de la circulación sistémica.',
 'liver':'Un gran órgano situado bajo el lado derecho del diafragma. Procesa los nutrientes absorbidos, produce bilis y sintetiza numerosas proteínas transportadas por la sangre.',
 'brain':'El órgano central del sistema nervioso. Sus regiones interconectadas intervienen en la percepción, el movimiento, la memoria, el lenguaje y la regulación de las funciones corporales.',
 'stomach':'Una cavidad muscular situada entre el esófago y el intestino delgado. Almacena y mezcla los alimentos con ácido y enzimas antes de liberarlos al duodeno.',
 'spleen':'Un órgano linfoide situado en la parte superior izquierda del abdomen. Filtra la sangre, elimina células sanguíneas envejecidas y participa en las respuestas inmunitarias.',
 'pancreas':'Un órgano abdominal con funciones digestivas y endocrinas. Aporta enzimas al intestino delgado y libera hormonas como la insulina y el glucagón.',
 'urinary bladder':'Un reservorio muscular situado en la pelvis que almacena la orina procedente de los riñones a través de los uréteres.',
 'trachea':'La principal vía respiratoria que conecta la laringe con los bronquios. Sus cartílagos ayudan a mantener abierta la vía aérea durante la respiración.',
 'diaphragm':'Un músculo amplio que separa el tórax del abdomen. Al contraerse aumenta el volumen torácico y facilita la entrada de aire en los pulmones.',
};
export function explanation(name:string,system:SystemId){return EXPLANATIONS[name.toLowerCase()] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';}
