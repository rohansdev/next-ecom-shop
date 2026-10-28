import { Suspense } from "react";
import ConfirmationPage from "./ConfirmationPage";

const Page = () => {
  return (
    <Suspense>
      <ConfirmationPage />
    </Suspense>
  );
};

export default Page;
