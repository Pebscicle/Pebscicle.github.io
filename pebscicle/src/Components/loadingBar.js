'use client';
 
import { useEffect, useState } from 'react';
 
export default function LoadingBar( {currentProgress, totalProgress} ) {

    return(
        <div className='w-full bg-red-700 rounded-sm'>
            <div style={{width: `${(currentProgress/totalProgress*100)}%`}} className='h-5 rounded-sm bg-green-500 text-center leading-6 text-white'>
                {/*(currentProgress/totalProgress*100)+"%"*/}
            </div>
        </div>
    );
  
}