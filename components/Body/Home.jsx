import React from 'react';
import Footer from '../Global/Footer';

const Home = () => {
  return (
    <div className='techwave_fn_content'>
      <div className='techwave_fn_page'>
        <div className='techwave_fn_home'>
          <div className='section_home'>
            <div className='section_left'>
              <div className='techwave_fn_title_holder'>
                <h1 className='title'>Automate Your Crypto Trading</h1>

                <p className='desc'>Crypto Trading Financial Bot For Buying and Sell Crypto</p>
              </div>

              <div className='techwave_fn_interactive_list'>
                <ul>
                  <li>
                    <div className='item'>
                      <a>
                        <span className='icon'>
                          <img src='img/lighticon/light-19.png' className='fn__svg' alt="" />
                        </span>
                        <h2 className='title'>Buy Any Token !!</h2>
                        <p className='desc'>This field of AI combines deep learning algorithms and generative models to create new images that resemble real-world photographs of exhibit creative and imaginative qualities.
                        </p>
                        <span className='arrow'>
                          <img src='img/lighticon/light-22.png' className='fn__svg' alt="" />
                        </span>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className='item'>
                      <a>
                        <span className='icon'>
                          <img src='img/lighticon/light-16.png' className='fn__svg' alt="" />
                        </span>
                        <h2 className='title'>Sell Any Token !!</h2>
                        <p className='desc'>An Al chatbot,short for artificial intelligence chatbot, is a computer program designed to simulate human-like conversations and provide automated responses to user queries or prompts.
                        </p>
                        <span className='arrow'>
                          <img src='img/lighticon/light-22.png' className='fn__svg' alt="" />
                        </span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          

          <div className='section_right'>
            <div className='company_info'>
              <img src='img/light-logo.png' alt="" />
              <p className='fn__animated_text'>
              CryptoHopper an AI-driven bot that makes crypto trading accessible, fun, and worthwhile for everyone. We pursue perfection , Work hard Learn every day, Join forces with our amazing team. And grow rapidly Together we optimize and innovate a bot that hosts mors than Nine Million transactions worth an estimated 2 billion USD each Month ...!!
              </p>
              <hr />
              <div className='fn__members'>
                <div className='active item'>
                  <span className='circle'></span>
                  <span className='text'>1,154,694 Online</span>
                </div>
                <div className='active item'>
                  <span className='circle'></span>
                  <span className='text'>77,345,912 Members</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;