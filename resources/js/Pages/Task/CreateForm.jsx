import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

const CreateForm = ({ auth, users, projects }) => {
    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: '',
        assigned_user_id: '',
        priority: '',
    })
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data)

        post(route('task.store', []))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header=
            {
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create New Task
                </h2>
            }
        >
            <Head title='Tasks' />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
                        <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div>
                                <SelectInput
                                    defaultValue={data.project_id}
                                    className='w-full'
                                    onChange={(e) => setData('project_id', e.target.value)}
                                >
                                    <option value=''>Select Project Id</option>
                                    {projects.data.map(project => (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.project_id} className='mt-2' />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='task_image_path' value='Task Image' />
                                <TextInput
                                    id='task_image_path'
                                    type='file'
                                    name='image'
                                    className='mt-1 block w-full'
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className='mt-2' />

                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='task_name' value='Task Name' />
                                <TextInput
                                    id='task_name'
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
                                <InputLabel htmlFor='task_description' value='Task Description' />
                                <TextAreaInput
                                    id='task_description'
                                    name='name'
                                    value={data.description}
                                    className='mt-1 block w-full'
                                    onChange={e => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className='mt-2' />
                            </div>
                            <div className='mt-4'>
                                <InputLabel htmlFor='due_date' value='Task Deadline' />
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

                            <div className='mt-4'>
                                <SelectInput
                                    defaultValue={data.priority}
                                    className='w-full'
                                    onChange={(e) => setData('priority', e.target.value)}
                                >
                                    <option value=''>Select Priority</option>
                                    <option value='low'>Logw</option>
                                    <option value='medium'>Medium</option>
                                    <option value='high'>High</option>
                                </SelectInput>
                                <InputError message={errors.priority} className='mt-2' />
                            </div>

                            <div className='mt-4'>
                                <SelectInput
                                    defaultValue={data.assigned_user_id}
                                    className='w-full'
                                    onChange={(e) => setData('assigned_user_id', e.target.value)}
                                >
                                    <option value=''>Assigned User</option>
                                    {users.data.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.assigned_user_id} className='mt-2' />
                            </div>

                            <div className='mt-4 text-right space-x-4'>
                                <Link href={route('task.index')} className='bg-red-500 hover:bg-red-600 py-2 px-3 text-white rounded shadow transition-all duration-150'>Cancel</Link>
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