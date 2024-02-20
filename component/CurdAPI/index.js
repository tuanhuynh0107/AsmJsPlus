var courseApi = 'http://localhost:3000/courses';
//get course
function getCourses(callback) {
    fetch(courseApi)
        .then((response) => {
            return response.json();
        })
        .then(callback);
}

function handleCreateCourse(data, callback) {    
    var options = {
        method: 'POST',        
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
    .then((response) => {
        response.json();
    })
        .then(callback);     
} 
