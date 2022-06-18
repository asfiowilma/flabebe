import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { Suspense } from "react";
import TrakteerButton from "../components/trakteer/TrakteerButton";
import TrakteerModal from "../components/trakteer/TrakteerModal";
import { TrakteerProvider } from "../components/trakteer/TrakteerProvider";

const CreateLinkForm = dynamic(() => import("../components/create-link"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen bg-[url('/images/bg.svg')] bg-no-repeat bg-cover text-white p-4">
      <TrakteerProvider>
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/logo.png"
          />
        </Head>
        <Image src="/images/logo.png" alt="logo" width={80} height={80} />
        <Suspense>
          <CreateLinkForm />
        </Suspense>
        <TrakteerButton className="bg-neutral text-neutral-content px-6 py-2 shadow-lg" />
        <TrakteerModal />
      </TrakteerProvider>
    </div>
  );
};

export default Home;
