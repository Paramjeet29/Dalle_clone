import FileSaver from 'file-saver'
import {surpriseMePrompts} from '../constants'

export function getRandomPrompt(prompt){
    const randomIndex=Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt=surpriseMePrompts[randomIndex];

    if(getRandomPrompt===prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

//to download the image in the device
export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}