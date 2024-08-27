import { EMAILEXISTS, INVALIDEMAIL } from '@/utils/constant';
import { SVGcloseModal, SVGremoveEmail } from '@/utils/images/svg';
import React, { useState, useImperativeHandle, forwardRef, Ref } from 'react';

interface MultiEmailInputProps {
  onEmailsSubmit: (emails: string[]) => void;
  disableStatus : boolean
}

export interface MultiEmailInputRef {
  getValidEmails: () => string[];
  resetEmails: () => void; 
}
const validEmailsTemp : Array<string> = [];
const invalidEmailsTemp : Array<string> = [];

const MultiEmailInput = forwardRef<MultiEmailInputRef, MultiEmailInputProps>(({ onEmailsSubmit , disableStatus }, ref) => {
  const [validEmails, setValidEmails] = useState<string[]>(validEmailsTemp);
  const [invalidEmails, setInvalidEmails] = useState<string[]>(invalidEmailsTemp);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  // const [isDisable , setIsDisable] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email) {
      e.preventDefault();
      if (validateEmail(email)) {
        if (!validEmails.includes(email)) {
          setValidEmails([...validEmails, email]);
          setEmail('');
          setError('');
        } else {
          setError(EMAILEXISTS);
        }
      } else {
        if (!invalidEmails.includes(email)) {
          setInvalidEmails([...invalidEmails, email]);
        }
        setEmail('');
        setError(INVALIDEMAIL);
      }
    }
  };

  const handleRemoveEmail = (email: string, isValid: boolean) => {
    if (isValid) {
      setValidEmails(validEmails.filter((e) => e !== email));
    } else {
      setInvalidEmails(invalidEmails.filter((e) => e !== email));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validEmails.length > 0) {
      onEmailsSubmit(validEmails);
      setError('');
    } else {
      setError('Please enter at least one valid email');
    }
  };

  useImperativeHandle(ref, () => ({
    getValidEmails: () => validEmails, resetEmails: () => {
      setValidEmails([]);
      setInvalidEmails([]);
    },
  }));

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-2 text-sm font-medium text-neutral-5">Invite by email*</label>
      <div className={`flex flex-wrap items-center px-4  py-2.5 border  rounded-lg ${error ? "border-error-4" : "border-gray-300"}`}>
        {validEmails.map((email, index) => (
          <div key={index} className="flex items-center mr-1 px-3 py-1 bg-gray-100 rounded-full">
            <span className="mr-2 text-neutral-2 text-sm">{email}</span>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => handleRemoveEmail(email, true)}
            >
               {SVGremoveEmail.active}
            </button>
          </div>
        ))}
        {invalidEmails.map((email, index) => (
          <div key={index} className="flex items-center mr-1 px-3 py-1 bg-error-9.5 border border-error-4 rounded-full">
            <span className="mr-2 text-neutral-2 text-sm">{email}</span>
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => handleRemoveEmail(email, false)}
            >
             {SVGremoveEmail.active}
            </button>
          </div>
        ))}
        <input
        disabled={disableStatus}
          type="email"
          className={`flex-1  border-none outline-none ${error && 'border-red-500'}`}
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {error && <p className="mt-2 text-error-4 text-sm font-normal">{error}</p>}
      {/* <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Submit
      </button> */}
    </form>
  );
});

MultiEmailInput.displayName = "MultiEmailInput";

export default MultiEmailInput;


