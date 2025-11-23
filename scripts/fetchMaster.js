 export function getMasterId(url){
    let parser = new URL(url);
    return parser.searchParams.get('id');
}


  
  


  
  