import React, { useEffect, useRef } from 'react';

const Chatbot: React.FC = () => {
  const chatboxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure chatboxRef exists before setting attributes
    if (chatboxRef.current) {
      console.log("GOt in")

      chatboxRef.current.setAttribute('page_id', '191293380731152');
      chatboxRef.current.setAttribute('attribution', 'biz_inbox');

      // Load the Facebook SDK and initialize it
      (window as any).fbAsyncInit = function () {
        (window as any).FB?.init({
          xfbml: true,
          version: 'v18.0',
        });
      };

      // Load the SDK asynchronously
      (function (d, s, id) {
        const js: HTMLScriptElement = d.createElement(s) as HTMLScriptElement; // Type assertion
        const fjs = d.getElementsByTagName(s)[0];
        if (!fjs || !js) return;
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        fjs.parentNode?.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    }
  }, []); // Run this effect only once when the component mounts

  return<>
    <div id="fb-root"></div>
    <div  ref={chatboxRef} id="fb-customer-chat" className="fb-customerchat"></div> 
  </>
  // return (
  //   <div></div>
  //   <div id="fb-customer-chat" className="fb-customerchat">
  //     CHATBOT
  //   </div>
  // );
};

export default Chatbot;
