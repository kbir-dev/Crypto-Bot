import React, { useState , useCallback, useEffect} from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

import { Footer } from '../index';

const AddNetwork = ({ axios }) => {
  //NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const notifySuccess = (msg) => toast.success(msg,{ duration: 2000 }); 

  const[displayImg, setDisplayImg] = useState("");

  const[network,setNetwork] = useState({
    networkName : "",
    rpcUrl : "",
    apiKey : "",
    walletAddress:"",
    praviteKey: "",
    image: displayImg,
  });

  const handleFormFieldChange =(fieldName, e) => {
    setNetwork({...network,[fieldName]:e.target.value})
  };

  const saveNetwork = () => {
    const {
      networkName,
      rpcUrl,
      apiKey,
      walletAddress,
      praviteKey,
      image
    } = network;

    if (
      !networkName ||
      !rpcUrl ||
      !apiKey ||
      !walletAddress ||
      !praviteKey ||
      !image
    )
      return notifyError("Provide all data");

      let networkArray = [];
      const networkLists = localStorage.getItem("setNetworks");
      if (networkLists) {
      networkArray = JSON.parse(localStorage.getItem("setNetworks"));
      networkArray.push(network);
      localStorage.setItem("setNetworks", JSON.stringify(networkArray));
      notifySuccess("Network added Successfully");
    } else {
      networkArray.push(network);
      localStorage.setItem("setNetworks", JSON.stringify(networkArray));
      notifySuccess("Network added Successfully");
    }
  };
  const uploadToInfura = async(file)=>{
    notifySuccess("Uploading File")
    if(file){
      try{
        const formData = new FormData();
        formData.append("file",file);

        const response = await axios({
          method : "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key : "dbd4d4d51fcfec67b98a",
            pinata_secret_api_key : "083fdd69f108d74df649d5b904a2c1e49096ad3de6a77d20f3c7269b917751df",
            "Content-Type" : "multipart/form-data",
          },
        });


        console.log(response);
        
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setNetwork({ ...network, image: ImgHash });
        setDisplayImg(ImgHash);
        notifySuccess("Uploaded Successfully");
      } catch (error) {
        notifyError("Unable to upload image to pinata");
        console.log(error)
      }
    }
  };

  const onDrop = useCallback(async(acceptedFile)=>{
    await uploadToInfura(acceptedFile[0]);
  })

  const {getInputProps , getRootProps, isDragAccept, isDragReject, isDragActive,} =
   useDropzone({ onDrop, maxSize: 500000000000});



  return (
  <div className="techwave_fn_content">
  <div className="techwave_fn_page">
    <div className="techwave_fn_user_settings_page">
      <div className="techwave_fn_pagetitle">
        <h2 className="title">Add Trading Tokens</h2>
      </div>

      <div className="container small">
        <div className="techwave_fn_user_settings">
          <form>
            <div className="user__settings">
              <div className="settings_left">
                <label htmlFor="input" className="fn__upload">
                  {
                    displayImg == "" ? (
                      <span className="upload_content" {...getRootProps()}>
                        <span className="title">Drag & Drop a Image</span>
                        <span className="fn__lined_text">
                          <span className='line'></span>
                          <span className='text'>Ok</span>
                          <span className='line'></span>
                        </span>

                        <span className='title'>Browse</span>
                        <span className='desc'>
                          Support JPG,JPEG & PNG
                        </span>
                        <input type="file" accept="image/*" {...getInputProps()}
                        />
                      </span>
                    ):(
                      <img src={displayImg} className="preview_img" />
                    )
                  }
                </label>
              </div>

              <div className='settings_right'>
                <div className='item'>
                  <label htmlFor="name" className='input_label'>
                    Network Name
                  </label>
                

                <div className='input_item'>
                  <input type="text" className='input' placeholder='NETWORK' onChange={(e)=>handleFormFieldChange("networkName",e)}/>
                </div>

                
                </div>

                <div className='item'>
                  <label htmlFor="name" className='input_label'>
                    Alchemy Provider
                  </label>
                

                <div className='input_item'>
                  <input type="text" className='input' placeholder='RPC URL' onChange={(e)=>handleFormFieldChange("rpcUrl",e)}/>
                </div>

                
                </div>

                <div className='item'>
                  <label htmlFor="name" className='input_label'>
                    Alchemy API Key
                  </label>
                

                <div className='input_item'>
                  <input type="text" className='input' placeholder='API KEY' onChange={(e)=>handleFormFieldChange("apiKey",e)}/>
                </div>

                
                </div>

                <div className='item'>
                  <label htmlFor="name" className='input_label'>
                    Wallet Address
                  </label>
                

                <div className='input_item'>
                  <input type="text" className='input' placeholder='WALLET ADDRESS' onChange={(e)=>handleFormFieldChange("walletAddress",e)}/>
                </div>

                
                </div>

                <div className='item'>
                  <label htmlFor="name" className='input_label'>
                    Private Key
                  </label>
                

                <div className='input_item'>
                  <input type="text" className='input' placeholder='PRIVATE KEY' onChange={(e)=>handleFormFieldChange("praviteKey",e)}/>
                </div>

                
                </div>

                <div className='item'>
                  <div>
                    <a onClick={()=>saveNetwork()} className='techwave_fn_button'>
                      Save Network
                    </a>
                  </div>
                </div>

              </div>
              
            </div>
          </form>
        </div>
      </div>
     </div>
    </div>
    <Footer/>
  </div>
  );
};

export default AddNetwork;



// API Key: dbd4d4d51fcfec67b98a
// API Secret: 083fdd69f108d74df649d5b904a2c1e49096ad3de6a77d20f3c7269b917751df
// JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZjM1MDUzMC03ZjU4LTRjMGYtYmEyZS1mYjYzZTdlMDYyOGMiLCJlbWFpbCI6ImNoZXRhbmNrNDEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJkYmQ0ZDRkNTFmY2ZlYzY3Yjk4YSIsInNjb3BlZEtleVNlY3JldCI6IjA4M2ZkZDY5ZjEwOGQ3NGRmNjQ5ZDViOTA0YTJjMWU0OTA5NmFkM2RlNmE3N2QyMGYzYzcyNjliOTE3NzUxZGYiLCJpYXQiOjE3MDY5NTEwNjZ9.InfPQ25C6HCtEp678EP6bqb68BPa_rE3qCdYd4x1rEE