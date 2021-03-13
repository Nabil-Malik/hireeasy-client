import * as actions from '../src/redux/actions'

test("should dispatch error_msg action",()=>{
    const job={}
    const expected={
        type:'error_msg',
        data:'Job Title is required!'
    }
    expect(actions.createJob(job)).toEqual(expected);
})