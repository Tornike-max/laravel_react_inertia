import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import ConfirmPassword from '../Auth/ConfirmPassword'

const CreateForm = ({ auth }) => {
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('user.store', []))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header=
            {
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create New User
                </h2>
            }
        >
            <Head title='Users' />

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
                                    type='text'
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
                                <InputLabel htmlFor='user_password_confirm' value='User Password' />
                                <TextInput
                                    id='user_password_confirm'
                                    type='password'
                                    name='password_confirmation'
                                    className='mt-1 block w-full'
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={errors.password_confirmation} className='mt-2' />
                            </div>
                            <div className='mt-4 text-right space-x-4'>
                                <Link href={route('user.index')} className='bg-red-500 hover:bg-red-600 py-2 px-3 text-white rounded shadow transition-all duration-150'>Cancel</Link>
                                <button type='submit' className='bg-emerald-500 hover:bg-emerald-600 py-2 px-3 text-white rounded shadow transition-all duration-150'>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default CreateForm