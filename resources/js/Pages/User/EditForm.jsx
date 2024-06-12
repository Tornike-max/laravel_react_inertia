import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

const EditForm = ({ auth, user }) => {
    const { data, setData, post, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        _method: 'PUT'
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('user.update', user.id))
    }

    return (
        <AuthenticatedLayout user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit</h2>
                    <Link className='bg-emerald-500 hover:bg-emerald-600 py-1 px-3 text-white rounded shadow transition-all duration-150'
                        href={route('user.index')}>
                        Go Back
                    </Link>
                </div>
            }
        >
            <Head title='Edit User' />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className='mt-4'>
                                <InputLabel htmlFor='user_name' value='User Name' />
                                <TextInput
                                    id='user_name'
                                    type='text'
                                    name='name'
                                    value={data.name}
                                    isFocused={true}
                                    className='mt-1 block w-full'
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className='mt-2' />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='user_email' value='User Email' />
                                <TextInput
                                    id='user_email'
                                    type='email'
                                    name='email'
                                    value={data.email}
                                    className='mt-1 block w-full'
                                    onChange={e => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className='mt-2' />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='user_password' value='User Password' />
                                <TextInput
                                    id='user_password'
                                    type='password'
                                    name='password'
                                    value={data.password}
                                    className='mt-1 block w-full'
                                    onChange={e => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className='mt-2' />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='user_password_confirm' value='Confirm Password' />
                                <TextInput
                                    id='user_password_confirm'
                                    type='password'
                                    name='password_confirmation'
                                    value={data.password_confirmation}
                                    className='mt-1 block w-full'
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={errors.password_confirmation} className='mt-2' />
                            </div>
                            <div className='mt-4 text-right space-x-4'>
                                <Link href={route('user.index')} className='bg-red-500 hover:bg-red-600 py-2 px-3 text-white rounded shadow transition-all duration-150'>Cancel</Link>
                                <button type='submit' className='bg-emerald-500 hover:bg-emerald-600 py-2 px-3 text-white rounded shadow transition-all duration-150'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default EditForm
