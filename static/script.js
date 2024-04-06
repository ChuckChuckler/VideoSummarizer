const prompt = `Write a shorter version of the information in the text given by the user. The writing should be 8-10 sentences long (sentences can be any complexity) and should cover all the IMPORTANT material; write only about the main content of the text. Do not include details about authors, intros or hooks that don't pertain to the content, and anything that starts with something similar to 'in the next video'. Do not write "This text talks about photosynthesis", rather, write "Photosynthesis is...". Please be AS SPECIFIC AS POSSIBLE and use all IMPORTANT information given.`;

let summarizer = new WizardOrpheus('', prompt);

summarizer.createUserAction({
  name: "sendTranscript",
  parameters: ["The text from the user that should be summarized."],
  howBotShouldHandle: "Respond to the user"
})

summarizer.botAction("respond", "Send a text response to the user", { response: "sample response" }, data => {
  console.log(data.response)
  document.getElementById("transcriptDisplay").innerText = data.response;
})

//***//

function submit(){
  let link = document.getElementById("link").value;
  fetch("/submitted", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({ data: link })
  })

  .then(response=>{
    if(!response.ok){
      console.log("oh no response are you okay :(")
    }else{
      return response.json();
    }
  })

  .then(data => {
    if (data.message != "eheu") {
      let transcript = data.message;
      summary = summarizer.sendTranscript(transcript);
    }else{
      console.log(data.message)
    }
  })

  .catch(error=>{
    console.log(`Error: ${error}`);
  })
}
