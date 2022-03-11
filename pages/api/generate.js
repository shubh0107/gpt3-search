import { Configuration, OpenAIApi } from "openai";
const fs = require("fs");
const path = require('path');

// const coolPath = path.join(__dirname, './documents.jsonl');

const FILE_ID = "file-28Sb29z9j4rTZ9OgA2aKa9eD"

const documentsPath = '/Users/shubhamsingh/shubham_dev/openai-quickstart-node/pages/api/documents.jsonl'


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const documents = [];

export default async function (req, res) {
  // const completion = await openai.createCompletion("text-davinci-001", {
  //   prompt: generatePrompt(req.body.animal),
  //   temperature: 0.6,
  // });

  try {
    // const response = await openai.createFile(fs.createReadStream(documentsPath), "search");
    

    const response = await openai.createSearch("davinci", {
      // documents: ["White House", "hospital", "school"],
      file: FILE_ID,
      query: req.body.query,
      return_metadata: true,
      user: 'shubham'
    });

    console.log('shubham 1111111 ')
    
    if (response.status === 200) {
      console.log('shubham 2222222 ')
      res.status(200).json({ result: response.data } );
    } else {
      console.log('shubham 3333333 ')
      
      // console.log('shubham ERROR respsone: ', response)
    }

  } catch (error) {
    console.log('shubham 44444 ')
    if (error.response) {
      res.status(error.response.status).json({ 
        data: error.response.data
      } );
      // console.log(error.response.status);
      // console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
