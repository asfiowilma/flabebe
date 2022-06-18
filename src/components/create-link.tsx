import type { NextPage } from "next";
import { useState } from "react";
import { nanoid } from "nanoid";
import debounce from "lodash/debounce";
import { trpc } from "../../utils/trpc";
import copy from "copy-to-clipboard";

type Form = {
  slug: string;
  url: string;
};

const CreateLinkForm: NextPage = () => {
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  const url = window.location.host;

  const slugCheck = trpc.useQuery(["slugCheck", { slug: form.slug }], {
    refetchOnReconnect: false, // replacement for enable: false which isn't respected.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const createSlug = trpc.useMutation(["createSlug"]);

  const isLoading = (form.slug && slugCheck.isLoading) || createSlug.isLoading

  if (createSlug.status === "success") {
    return (
      <div className="bg-base-300 p-6 rounded-box shadow-lg w-full max-w-screen-sm">
        <div className="flex justify-center gap-2 items-center">
          <div className="input flex-1 overflow-auto flex items-center font-medium text-lg">{`${url}/${form.slug}`}</div>
          <input
            type="button"
            value="Copy Link"
            className="btn btn-primary"
            onClick={() => {
              copy(`${url}/${form.slug}`);
            }}
          />
          <input
            type="button"
            value="go back"
            className="btn"
            onClick={() => {
              createSlug.reset();
              setForm({ slug: "", url: "" });
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createSlug.mutate({ ...form });
      }}
      className="flex flex-col gap-2 justify-center w-full sm:w-[500px] p-6 bg-base-300 rounded-box shadow-lg"
    >
      <div className="flex items-center">
        <input
          type="url"
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="Enter your long url"
          className="input w-full"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">{url}/</span>
        <input
          type="text"
          onChange={(e) => {
            setForm({
              ...form,
              slug: e.target.value,
            });
            debounce(slugCheck.refetch, 100);
          }}
          minLength={1}
          placeholder="slug"
          className="input w-full flex-1"
          value={form.slug}
          pattern={"^[-a-zA-Z0-9]+$"}
          title="Only alphanumeric characters and hypens are allowed. No spaces."
          required
        />
        <input
          type="button"
          value="Random"
          className="btn hidden sm:inline-flex"
          onClick={() => {
            const slug = nanoid();
            setForm({
              ...form,
              slug,
            });
            slugCheck.refetch();
          }}
        />
      </div>
      <div className="flex gap-2">
        <input
          type="button"
          value="Random"
          className="btn inline-flex sm:hidden flex-none"
          onClick={() => {
            const slug = nanoid();
            setForm({
              ...form,
              slug,
            });
            slugCheck.refetch();
          }}
        />
        <button
          type="submit"
          className={`btn btn-primary flex-1 ${isLoading && "loading"} `}
          disabled={slugCheck.isFetched && slugCheck.data!.used}
        >
          {
            form.slug && slugCheck.isLoading ? "checking availability" :
              createSlug.isLoading ? "shortening your url.." :
                slugCheck.data?.used ? "slug is unavailable 😢" : "shorten"
          }
        </button>
      </div>
    </form>
  );
};

export default CreateLinkForm;
