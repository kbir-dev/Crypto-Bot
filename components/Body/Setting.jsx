import React, { useState , useCallback, useEffect} from "react";
import { useDropzone } from "react-dropzone";
import { Footer } from '../index';

const Setting = ({ notifyError , notifySuccess , axios }) => {
  const[displayImg, setDisplayImg] = useState("");
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem
      ("userProfile"));
      setUserDetails (user);
  }, []);

  const[user,setUser] = useState({
    name : "",
    userName : "",
    walletAddress:"",
    praviteKey: "",
    image: displayImg,
    biography: "",
  });

  const handleFormFieldChange =(fieldName, e) => {
    setUser({...user,[fieldName]:e.target.value})
  };

  const saveUser = () => {
    const {
      name,
      userName,
      walletAddress,
      praviteKey,
      image,
      biography,
    } = user;

    if (
      !name ||
      !userName ||
      !walletAddress ||
      !praviteKey ||
      !image ||
      !biography
    )
      return notifyError("Provide all data");

      localStorage.setItem("userProfile", JSON.stringify(user));
      notifySuccess("Profile updated Successfully");

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
            pinata_api_key : "2c302283f6b0e0967abc",
            pinata_secret_api_key : "9aeb1eb1b83fabfcde139a1908cf3e304f002e93e70bedc6a3a84b361225ca9e","Content-Type" : "multipart/form-data",
          },
        });


        console.log(response);
        
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setUser ({ ...user, image: ImgHash });
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

  const {
     getInputProps ,
     getRootProps ,
     isDragAccept,
     isDragReject, 
     isDragActive,
    } = useDropzone({ onDrop, maxSize: 500000000000});

  return (
    <div className="techwave_fn_content">
    <div className="techwave_fn_page">
      <div className="techwave_fn_user_settings_page">
        <div className="techwave_fn_pagetitle">
          <h2 className="title">Setting</h2>
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
                      Name
                    </label>
                  
  
                  <div className='input_item'>
                    <input type="text" className='input' placeholder={userDetails?.name || "Update"} onChange={(e)=>handleFormFieldChange("name",e)}/>
                  </div>
  
                  
                  </div>
  
                  <div className='item'>
                    <label htmlFor="name" className='input_label'>
                      Username
                    </label>
                  
  
                  <div className='input_item'>
                    <input type="text" className='input' placeholder={userDetails?.userName || "Update"} onChange={(e)=>handleFormFieldChange("userName",e)}/>
                  </div>
  
                  
                  </div>
  
                  <div className='item'>
                    <label htmlFor="name" className='input_label'>
                      Wallet Address
                    </label>
                  
  
                  <div className='input_item'>
                    <input type="text" className='input' placeholder={userDetails?.WalletAddress || "Update"} onChange={(e)=>handleFormFieldChange("walletAddress",e)}/>
                  </div>
  
                  
                  </div>
  
                  <div className='item'>
                    <label htmlFor="name" className='input_label'>
                      Private Key
                    </label>
                  
  
                  <div className='input_item'>
                    <input type="text" className='input' placeholder={userDetails?.praviteKey || "Update"} onChange={(e)=>handleFormFieldChange("praviteKey",e)}/>
                  </div>
  
                  
                  </div>
  
                  <div className='item'>
                    <label htmlFor="name" className='input_label'>
                      Biography
                    </label>
                  
  
                  <div className='input_item'>
                    <textarea type="text" className='input' placeholder={userDetails?.biography || "Update"} onChange={(e)=>handleFormFieldChange("biography",e)}/>
                  </div>
  
                  
                  </div>
  
                  <div className='item'>
                    <div>
                      <a onClick={()=>saveUser()} className='techwave_fn_button'>
                        Save Profile
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

export default Setting