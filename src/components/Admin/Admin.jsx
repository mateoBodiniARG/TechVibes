import React from 'react';

const Admin = () => {
  return (
    <div className='text-center text-2xl text-white bg-gray-900 min-h-screen flex items-center justify-center'>
      <div>
        <form className='max-w-md mx-auto p-8 bg-white rounded-lg shadow-md' action=''>
          <div className='grid grid-cols-1 gap-4'>
            <div>
              <label className='block text-gray-700' htmlFor='user-name'>
                Nombre de usuario
              </label>
              <input
                className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='text'
                id='user-name'
              />
            </div>
            <div>
              <label className='block text-gray-700' htmlFor='password'>
                Contraseña
              </label>
              <input
                className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                type='password'
                id='password'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
