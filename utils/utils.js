function slugify(text) {
  return text
    .toString()               
    .normalize('NFKD')        
    .toLowerCase()            
    .trim()                   
    .replace(/\s+/g, '-')     
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-');  
}


module.exports = {
    slugify
}