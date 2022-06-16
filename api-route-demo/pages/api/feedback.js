import fs from "fs";
import path from "path";

const handler = (req, res) => {

    if(req.method==="POST"){
        const email = req.body.email;
        const feedbackText = req.body.text;
        const newFeedBack = {
            id:new Date().toISOString(),
            email:email,
            text:feedbackText,
        }
        // store in database or file
        const filePath =path.join(process.cwd(),"data","feedback.json");
        const fileData =fs.readFileSync(filePath);
        const data = JSON.parse(fileData);
        data.push(newFeedBack);
        fs.writeFileSync(filePath,JSON.stringify(data));
        res.status(202).json({success:true,feedback:newFeedBack});
    }else{
        return res.status(400).json(
            {
                success: false,
                msg: "Fail to save feedback."
            }
        )
    }
   
}
export default handler;