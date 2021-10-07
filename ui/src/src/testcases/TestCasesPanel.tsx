import Button, { linkNeutralClasses } from "../components/ui/Button";
import { PropsWithChildren, useMemo, useState } from "react";
import PlayIcon from "@heroicons/react/solid/PlayIcon";
import PlusCircleIcon from "@heroicons/react/outline/PlusCircleIcon";
import { ExistingAttribute, ExistingTestCase, FakeAttribute } from "../domain";
import TestCase from "./TestCase";
import { backendService, mapClientAttributeToServer } from "../services/backend";
import clsx from "clsx";
import { captionClasses } from "../components/ui/typography";
import Dialog from "../components/testcase/Dialog";
import { FormValues } from "../components/testcase/Form";

export type TestCasesPanelProps = PropsWithChildren<{
  projectID: string;
  selectedTestCaseID: string | undefined;
  attributes: (ExistingAttribute | FakeAttribute)[];
  onTestCaseAdded: (testCase: ExistingTestCase) => void;
}>;

const useLegacyAttributes = (attributes: (ExistingAttribute | FakeAttribute)[]) =>
  useMemo(() => attributes.map(mapClientAttributeToServer), [attributes]);

const TestCasesPanel = ({
  children,
  selectedTestCaseID,
  projectID,
  attributes,
  onTestCaseAdded,
}: TestCasesPanelProps): JSX.Element => {
  const legacyAttributes = useLegacyAttributes(attributes);
  const [showAddTestCase, setShowAddTestCase] = useState(false);
  const handleAddFormSubmit = async (values: FormValues) => {
    setShowAddTestCase(false);
    onTestCaseAdded(await backendService.project(projectID).testCases.create(values, attributes));
  };
  return (
    <>
      {showAddTestCase && (
        <Dialog attributes={attributes} onCancel={() => setShowAddTestCase(false)} onSubmit={handleAddFormSubmit} />
      )}
      <div className="flex mt-5 gap-3">
        <div className="w-1/3 bg-white ml-8 pb-8  border">
          <div className="flex gap-2 pt-5 pl-5 items-center flex-wrap">
            {/* <h2 className={clsx("font-medium m-0 flex-grow")}>Test cases</h2> */}
            <h2 className={clsx(captionClasses, "flex-grow")}>Test cases</h2>
            <Button.Link
              className={clsx("flex gap-2 items-center", linkNeutralClasses)}
              onClick={() => setShowAddTestCase(true)}
            >
              <PlusCircleIcon className="w-6 h-6" />
              Add
            </Button.Link>
            <Button.Primary className="flex gap-2 pl-3 pr-3 items-center">
              <PlayIcon className="w-6 h-6" />
              Launch
            </Button.Primary>
          </div>
          {children}
        </div>
        <div className="w-2/3 mr-8 bg-white border p-5 pb-7">
          {selectedTestCaseID && (
            <TestCase projectId={projectID} projectAttributes={legacyAttributes} testcaseId={selectedTestCaseID} />
          )}
        </div>
      </div>
    </>
  );
};

export default TestCasesPanel;
