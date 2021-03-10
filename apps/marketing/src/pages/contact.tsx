import { ThemeProvider } from '@vroom-web/ui';
import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React, { useEffect } from 'react';

import Contact from 'src/modules/contact';
import { BrandContext } from 'src/modules/contact/BrandContext';
import Page from 'src/Page';
import { PageData, returnBrandConfig } from 'src/utils/utils';

interface Props {
  brand: Brand;
  description: string;
  title: string;
  canonical: string;
}

const ContactPage: NextPage<Props> = ({
  brand,
  canonical,
  description,
  title,
}) => {
  const head = (
    <>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description}></meta>
    </>
  );

  const css = `
    #chat-container {
      height: 600px;
      width: 450px;
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
  `;

  const jss = `
    var launchButton = document.getElementById("launch-chat")
    var toggleButton = document.getElementById("toggle-chat")
    var chatContainer = document.getElementById("chat-container")
    launchButton.addEventListener("click", function () {
      // Launch the chat widget inside the container
      
      Pypestream("config", {
        first_name: "", // TODO: Input user's first name
        last_name: "", // TODO: Input user's last name
        phone: "", // TODO: Input user's phone number
        email: "", // TODO: Input user's email address
        screen_name: "", // TODO: Input user's landing page
        token: "", // TODO: Input user token
        passthrough: "", // TODO: Pass any additional data
        domain: "prod",
        env: "sandbox",
        beta: true,
        gtm_id: 'GTM-PZJGZ67'
      })
      Pypestream("boot", {
        APP_ID: "70c71811-1c35-4db7-b9d2-21754f24ba0c"
      }, chatContainer)
    })
    toggleButton.addEventListener("click", function () {
      Pypestream("toggle")
    })
  `;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://webchat-sandbox.pypestream.com/webchat-public.js";
    script.async = true;
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.innerHTML = jss;
    console.log(script2);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
    }
  }, []);

  return (
    <BrandContext.Provider value={brand}>
      <ThemeProvider brand={brand}>
        <Page brand={brand} name="Contact" head={head}>
          <Contact />
          <style>{ css }</style>
          <button id="launch-chat">Launch</button>
          <button id="toggle-chat">Toggle</button>
          <div id="chat-container"></div>
        </Page>
      </ThemeProvider>
    </BrandContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  const brand = determineWhitelabel(ctx);
  const brandConfig = returnBrandConfig(brand, PageData.CONTACT);

  return {
    props: {
      brand,
      description: brandConfig.description,
      title: brandConfig.title,
      canonical: brandConfig.canonical,
    },
  };
};

export default ContactPage;
