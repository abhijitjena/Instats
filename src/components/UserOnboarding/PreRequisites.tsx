import React, { ReactElement } from 'react';

import laptop from '../../resources/cats/laptop.gif';
import scratch from '../../resources/cats/scratch.gif';
import sleepyCat1 from '../../resources/cats/sleepy1.gif';
import uploadStep1 from '../../resources/uploadSteps/IMG_1159.png';
import uploadStep2 from '../../resources/uploadSteps/IMG_1160.png';
import uploadStep3 from '../../resources/uploadSteps/IMG_1161.png';
import uploadStep4 from '../../resources/uploadSteps/IMG_1162.png';
import uploadStep5 from '../../resources/uploadSteps/IMG_1163.png';
import uploadStep6 from '../../resources/uploadSteps/IMG_1164.png';
import uploadStep7 from '../../resources/uploadSteps/IMG_1165.png';
import uploadStep8 from '../../resources/uploadSteps/IMG_1167.png';
import uploadStep9 from '../../resources/uploadSteps/IMG_1168.png';
import uploadStep10 from '../../resources/uploadSteps/IMG_1169.png';
import uploadStep11 from '../../resources/uploadSteps/IMG_1170.png';
import uploadStep12 from '../../resources/uploadSteps/IMG_1171.png';
import SectionTitle from '../SectionTitle';
interface IUploadStep {
  pattern: string;
  imgSrc: string;
  imgAlt: string;
  textElement: () => ReactElement;
}

const PreRequisites = (): ReactElement => {
  const uploadStepView = (props: IUploadStep): ReactElement => {
    const { imgAlt, imgSrc, pattern, textElement } = props;
    return (
      <div className="w-full my-14 h-[66rem] p-16 flex flex-row items-start justify-center">
        <div
          className={`w-96 h-[60rem] flex flex-col items-center justify-start ${pattern} pattern-opacity-100`}
        >
          <div className="w-full h-[12rem] flex flex-col justify-start items-start">
            {textElement()}
          </div>
          <div className="w-[350px] h-[700px]">
            <img src={imgSrc} width={400} height={730} alt={imgAlt} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="my-10 w-full flex flex-col justify-center items-center">
      <SectionTitle title="Before we begin" />
      <div>
        <img
          src={sleepyCat1}
          width={160}
          height={160}
          alt="sleepy cat"
          className="relative top-32 left-72"
        />
      </div>
      <div className="w-2/3 my-14 h-[36rem] pattern-zigzag-3d pattern-cyan-300 pattern-bg-cyan-400 pattern-opacity-100 p-16">
        <p className="text-cyan-800 font-bold text-lg font-poppins mb-10">
          {
            'Instagram allows you to access your data through a download request. This tool uses the data to calculate and present interesting stats that is not available on the official app.'
          }
        </p>
        <p className="text-cyan-800 font-bold text-lg font-poppins mb-10">
          {
            "This tool doesn't have an associated server, none of your data is collected and sent to a server. The calculation is done on the browser and the data is stored on the browser itself. You may click reset to remove the stored data."
          }
        </p>
        <p className="text-cyan-800 font-bold text-lg font-poppins mb-10">
          {
            'This tool only works on Desktop browsers as you need to upload folders to your browser which cannot be done on mobile browsers.'
          }
        </p>
        <p className="text-cyan-800 font-bold text-lg font-poppins mb-10">
          {
            "Please keep your Instagram password handy in order to log in to Instagram on a desktop browser and download your data.\n This tool doesn't require your Instagram login credentials in any capacity."
          }
        </p>
      </div>
      <div className="mt-40" />
      <SectionTitle title="How to download your data" />
      <img
        src={laptop}
        width={160}
        height={160}
        alt="lappy cat"
        style={{ marginTop: 60 }}
      />
      <div className="flex steps-carousel flex-row justify-start items-start w-full overflow-x-auto">
        {uploadStepView({
          imgAlt: 'Image of Instagram profile with Settings and privacy highlighted',
          imgSrc: uploadStep1,
          pattern:
            'pattern-diagonal-lines pattern-size-4 pattern-cyan-300 pattern-bg-cyan-400',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle font-pikachu text-cyan-800">
                Click on the three lines on top of your profile and click{''}
                <div className="text-blue-950 font-bold">Settings and Privacy</div>
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt: 'Image of Settings and privacy page with Accounts Center highlighted',
          imgSrc: uploadStep2,
          pattern: 'pattern-dots pattern-size-4 pattern-rose-300 pattern-bg-rose-200',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle font-pikachu text-pink-900">
                Under Setting and privacy, choose
                <div className="text-pink-700 font-bold">Accounts Center</div>
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt:
            'Image of Accounts Center with "Your information and permissions" highlighted',
          imgSrc: uploadStep3,
          pattern:
            'pattern-lines pattern-size-2 pattern-orange-100 pattern-bg-orange-200',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle font-pikachu text-orange-700">
                Under Accounts Center, choose
                <div className="text-orange-500 font-bold">
                  Your information and permissions
                </div>
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt:
            'Image of "Your information and permissions" page with "Download your information" highlighted',
          imgSrc: uploadStep4,
          pattern: 'pattern-moon pattern-size-4 pattern-green-300 pattern-bg-green-200',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle font-pikachu text-green-700">
                Under Your information and permissions, choose
                <div className="text-green-900 font-bold">Download your information</div>
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt:
            'Image of "Download your information" page with "Request a download" highlighted',
          imgSrc: uploadStep5,
          pattern:
            'pattern-paper pattern-size-16 pattern-violet-300 pattern-bg-violet-200',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle font-pikachu text-violet-800">
                In Download your inormation page, choose
                <div className="text-violet-900 font-bold">Request a download</div>
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt:
            'Image of "Select accouts and profiles" page with one Instagram account selected',
          imgSrc: uploadStep6,
          pattern: 'pattern-wavy pattern-size-4 pattern-yellow-100 pattern-bg-yellow-200',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle font-pikachu text-yellow-500">
                Select your Instagram account in the Accounts and Profiles page
                <div className="text-yellow-600 font-bold">
                  Only select one Instagram account at a time
                </div>
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt: 'Image of "Select information" page with "Complete copy" selected',
          imgSrc: uploadStep7,
          pattern:
            'pattern-vertical-lines pattern-size-4 pattern-red-100 pattern-bg-red-200',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle font-pikachu text-red-500">
                Choose <span className="text-red-600 font-bold">Complete copy</span> in
                the Select information page
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt: 'Image of "Select file options" page with "JSON" Format selected',
          imgSrc: uploadStep8,
          pattern: 'pattern-zigzag pattern-size-4 pattern-blue-100 pattern-bg-blue-200',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle pattern-bg- font-pikachu text-blue-500">
                In the Select file options page,
                <div className="text-blue-600 font-bold">Choose Format as JSON</div>
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt: 'Image of "Select file options" page with "JSON" Format selected',
          imgSrc: uploadStep9,
          pattern:
            'pattern-rhombus pattern-size-4 pattern-amber-100 pattern-bg-amber-200',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle font-pikachu text-amber-500">
                {"Media isn't needed for this tool but there is no option to exclude"},
                <div className="text-amber-600 font-bold">
                  Choose Media Quality as Low
                </div>
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt: 'Image of "Date range" page with "All time" selected',
          imgSrc: uploadStep10,
          pattern: 'pattern-boxes pattern-size-4 pattern-lime-200 pattern-bg-lime-300',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle text-center font-pikachu text-lime-700">
                Choose Date range as
                <div className="text-lime-900 font-bold">All time</div>
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt:
            'Image of "Select file options" page with recommended settings and Submit Reuest button',
          imgSrc: uploadStep11,
          pattern:
            'pattern-triangles pattern-size-4 pattern-fuchsia-200 pattern-bg-fuchsia-300',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle text-center font-pikachu text-fuchsia-700">
                Once verified, click on
                <div className="text-fuchsia-900 font-bold">Submit Request</div>
              </p>
            );
          },
        })}

        {uploadStepView({
          imgAlt: 'Image of "Date range" page with "All time" selected',
          imgSrc: uploadStep12,
          pattern:
            'pattern-isometric pattern-size-6 pattern-emerald-200 pattern-bg-emerald-300',
          textElement: () => {
            return (
              <p className="p-8 w-full align-middle text-center font-pikachu text-emerald-700">
                You should see your request in
                <p className="text-emerald-900 font-bold my-0">Pending Download</p>
              </p>
            );
          },
        })}
      </div>
      <div className="mb-40 w-2/3 h-56 mt-10 px-16 py-10 bg-lime-300">
        <p className="text-lime-700 font-poppins font-bold text-lg">
          Once these steps are over, Instagram will notify over your email id when the
          requested data is available. Please use a web browser to open the link in the
          mail.
        </p>
        <p className="text-lime-700 font-poppins font-bold text-lg">
          The link will redirect you to Instagram where you need to login and download
          from the link provided.
        </p>
        <img
          src={scratch}
          width={140}
          height={140}
          alt="scratch cat"
          className="relative -top-[10rem] left-[101%]"
        />
      </div>
    </div>
  );
};

export default PreRequisites;
