export default (content) => {
    const nameRegex = /([|[\]{};)])+/;
    
      return nameRegex.test(content)
}