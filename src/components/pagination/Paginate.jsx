

const Paginate = () => {
  return (
    <div className='w-full flex items-center justify-center p-5'>
      <div className='join'>
        <input
          className='join-item btn btn-square'
          type='radio'
          name='options'
          aria-label='1'
          checked='checked'
        />
        <input
          className='join-item btn btn-square'
          type='radio'
          name='options'
          aria-label='2'
        />
        <input
          className='join-item btn btn-square'
          type='radio'
          name='options'
          aria-label='3'
        />
        <input
          className='join-item btn btn-square'
          type='radio'
          name='options'
          aria-label='4'
        />
      </div>
    </div>
  )
}

export default Paginate
