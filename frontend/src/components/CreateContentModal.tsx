import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { PlusIcon } from "../icons/PlusIcon";
interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
  }

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

// controlled component
export function CreateContentModal({open, onClose}:CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        onClose();
    }

    return <div>
        {open && <div> 
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
               
            </div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded fixed">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder={"Title"} />
                            <Input reference={linkRef} placeholder={"Link"} />
                        </div>
                        <div>
                            <h1>Type</h1>
                            <div className="flex gap-1 justify-center pb-2">
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "Primary" : "Secondary"} startIcon={<YoutubeIcon/>} onClick={() => {
                                    setType(ContentType.Youtube)
                                }}></Button>
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "Primary" : "Secondary"} startIcon={<TwitterIcon/>} onClick={() => {
                                    setType(ContentType.Twitter)
                                }}></Button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="Primary" startIcon={<PlusIcon/>} text="Submit" />
                        </div>
                    </span>
                </div>     
            </div>
            
        </div>}
    </div>

}