import ajax from './ajax'

// 添加个人信息API
export function reqAddUserInfo(userInfo){
    return ajax({
        url:'/add',
        method:'POST',
        data:userInfo
    })
}

// 获取个人信息API
export const reqGetSweetInfo = () => ajax('/userinfo')

// 获取博客信息
export const reqGetBlog = () => ajax('/blog')

// 添加博客信息
export function reqAddBlog(blog){
    return ajax({
        url:'/addblog',
        method:'POST',
        data:blog
    })
}

//通过id获取某一个博客
export const reqGetBlogById = (blogid) => ajax('/blogid?blogid='+blogid)