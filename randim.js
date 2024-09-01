// var randomNumber = Math.floor(Math.random() * 10);
// var str = "";

// while(str.length < 6){
//     str = str+Math.floor(Math.random() * 10);
// }
// console.log(str);


// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');

// const url = 'http://teleuniv.in/sanjaya/student-images/22BD1A057Q.jpg';
// const outputPath = path.join(__dirname, 'downloaded_image.jpg');

// axios({
//   method: 'get',
//   url: url,
//   responseType: 'stream', // Set the response type to stream for binary data
// })
//   .then(response => {
//     // Pipe the image stream to a file
//     response.data.pipe(fs.createWriteStream(outputPath));

//     response.data.on('end', () => {
//       console.log('Image downloaded successfully.');
//     });
//   })
//   .catch(error => {
//     console.error(`Failed to fetch data: ${error.message}`);
//   });



// const url = 'http://teleuniv.in/netra/api.php';
// const data = {
//   // Your JSON data goes here
//   // For example:
//   key1: 'value1',
//   key2: 'value2',
// };

// const headers = {
//   'Content-Type': 'application/json',
//   // Add any additional headers if needed
//   // For example:
//   // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
// };

// fetch(url, {
//   method: 'POST',
//   headers: new Headers(headers),
//   mode: 'cors',
//   credentials: 'include', // Include credentials for cross-origin requests
//   body: JSON.stringify(data),
// })
//   .then(response => response.json())
//   .then(result => {
//     console.log('Response:', result);
//   })
//   .catch(errorg => {
//     console.error('Error:', error);
//   });



const fetchData = async () => {
    try {
      const response = await fetch("http://teleuniv.in/netra/api.php", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        //   "authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90ZWxldW5pdi5pblwvYXV0aFwvIiwiYXVkIjoiaHR0cDpcL1wvdGVsZXVuaXYuaW5cL2F1dGhcLyIsImlhdCI6MTcwNTQ5ODI1MCwiZXhwIjoxNzA1NTAxODUwLCJkYXRhIjp7InVzZXJfaWQiOiIxMzg3NCIsIm5ldHJhaWQiOiIxMzg3NCIsInNhbmpheWFpZCI6IjEzODc0In19.78JD50KHVc9YdDY65haUMkrjRjEsDzopjl8A8kFpTJk",
          "content-type": "application/json",
          "Referer": "http://teleuniv.co.in/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"method\":\"314\",\"rollno\":\"2422066\"}",
        "method": "POST"
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };
  
  fetchData();


const res = async () => {
    try {
      const response = await fetch("https://kmitastra.vercel.app/api/rollno", {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "Referer": "https://kmitastra.vercel.app/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: JSON.stringify({ "rollno": "22BD1A057Q" }),
        method: "POST"
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };
  
  // Call the res function to make the request
  res();



const res1 = async () => {
try {
    const response = await fetch("http://teleuniv.in/netra/api.php", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          "authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90ZWxldW5pdi5pblwvYXV0aFwvIiwiYXVkIjoiaHR0cDpcL1wvdGVsZXVuaXYuaW5cL2F1dGhcLyIsImlhdCI6MTcwNTUwMjAzMiwiZXhwIjoxNzA1NTA1NjMyLCJkYXRhIjp7InVzZXJfaWQiOiIxMzg3NCIsIm5ldHJhaWQiOiIxMzg3NCIsInNhbmpheWFpZCI6IjEzODc0In19._JQZHBC4lnHke8Dx0D7PAZPw44hmIAbkhKidFQ0Mehg",
          "content-type": "application/json",
          "Referer": "http://teleuniv.co.in/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"method\":\"32\",\"rollno\":\"2422066\"}",
        "method": "POST"
      });

    if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    console.log(data);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
};

// Call the res function to make the request
res1();


const internalResults = async() => {
    try {
        const response = await fetch("http://teleuniv.in/trinetra/pages/templates/wrapper/studentmanagement/internalmarks_app.php?sid=2422083", {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              "upgrade-insecure-requests": "1",
              "Referer": "http://teleuniv.co.in/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.text();
            console.log(data);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

internalResults();


const externalResults = async() => {
    try {
        const response = await fetch("http://teleuniv.in/trinetra/pages/templates/wrapper/studentmanagement/externalmarks_app.php?sid=2422083", {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              "upgrade-insecure-requests": "1",
              "Referer": "http://teleuniv.co.in/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.text();
            console.log(data);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// externalResults();


const externalResultsOfSem = async() => {
    try {
        const response = await fetch("http://teleuniv.in/trinetra/pages/lib/student_ajaxfile.php?mid=57&rollno=2422083&year=1&sem=2", {
            // "headers": {
            //   "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            //   "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            //   "upgrade-insecure-requests": "1",
            //   "Referer": "http://teleuniv.co.in/",
            //   "Referrer-Policy": "strict-origin-when-cross-origin"
            // },
            "body": null,
            "method": "GET"
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.text();
            console.log(data);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}
// externalResultsOfSem();
