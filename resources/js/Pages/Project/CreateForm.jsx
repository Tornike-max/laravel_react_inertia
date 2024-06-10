import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

const CreateForm = ({ auth }) => {
    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: ''
    })
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('project.store', []))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header=
            {
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create New Project
                </h2>
            }
        >
            <Head title='Projects' />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div>
                                <InputLabel htmlFor='project_image_path' value='Project Image' />
                                <TextInput
                                    id='project_image_path'
                                    type='file'
                                    name='image'
                                    className='mt-1 block w-full'
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className='mt-2' />

                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='project_name' value='Project Name' />
                                <TextInput
                                    id='project_name'
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
                                <InputLabel htmlFor='project_description' value='Project Description' />
                                <TextAreaInput
                                    id='project_description'
                                    name='name'
                                    value={data.description}
                                    className='mt-1 block w-full'
                                    onChange={e => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className='mt-2' />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='due_date' value='Project Deadline' />
                                <TextInput
                                    id='due_date'
                                    type='date'
                                    name='due_date'
                                    value={data.due_date}
                                    isFocused={true}
                                    className='mt-1 block w-full'
                                    onChange={e => setData('due_date', e.target.value)}
                                />
                                <InputError message={errors.due_date} className='mt-2' />
                            </div>
                            <div className='mt-4'>
                                <SelectInput
                                    defaultValue={data.status}
                                    className='w-full'
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value=''>Select Status</option>
                                    <option value='pending'>Pending</option>
                                    <option value='in_progress'>In Progress</option>
                                    <option value='completed'>Completed</option>
                                </SelectInput>
                                <InputError message={errors.status} className='mt-2' />

                            </div>
                            <div className='mt-4 text-right space-x-4'>
                                <Link href={route('project.index')} className='bg-red-500 hover:bg-red-600 py-2 px-3 text-white rounded shadow transition-all duration-150'>Cancel</Link>
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