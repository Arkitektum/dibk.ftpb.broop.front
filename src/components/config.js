const config = {};
export default config;

function load() {
    console.log("public url:", process.env.PUBLIC_URL)
    return fetch(`${process.env.PUBLIC_URL || ''}/config.json`)
    .then(result => result.json())
    .then((newconfig) => {
        for(let prop in config) {
            delete config[prop]
        }
        for(let prop in newconfig) {
            config[prop] = newconfig[prop]
        }
        return config;
    });
}
export {load}