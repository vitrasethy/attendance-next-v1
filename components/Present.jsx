"use client"

import { useEffect, useRef } from 'react';
import { present } from "@/components/actions";

export default function Present({ params }) {
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  }, []);

  return (
    <form ref={formRef} className={'hidden'} action={present}>
      <input type={'hidden'} value={params.classroom_id} name={'classroom_id'} />
      <input type={'hidden'} value={params.record_id} name={'record_id'} />
      <input type={'hidden'} value={params.record_code} name={'record_code'} />
      <button type={'submit'}>Submit</button>
    </form>
  )
}