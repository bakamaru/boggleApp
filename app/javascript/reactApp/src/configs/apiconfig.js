let apiEndPoints;
function getApiEndPoints() {
    switch (process.env.NODE_ENV) {
        case 'development':
            apiEndPoints = {                
                base: "http://localhost:3000/"
            };
            break;
        case 'production':
            apiEndPoints = {
              base: "/"
            };
            break;
        default:
            apiEndPoints = {                
                base: "http://localhost:3000/"
            };
    }
    return apiEndPoints;
}
export const ApiEndPoints = getApiEndPoints();
