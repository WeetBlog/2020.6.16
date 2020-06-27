import { reqGetBlog ,reqAddBlog,reqGetBlogById } from '../../api'

export default {
    state: {
        blog: [],
        oneBlog:{}
    },
    mutations: {
        receive_blog(state, blog) {
            state.blog = blog
        },
        receive_one_blog(state,oneBlog){
            state.oneBlog = oneBlog
        }
    },
    actions: {
        async getBlog({ commit }) {
            // 向后台请求用户信息
            const result = await reqGetBlog()
            if (result) {
                const blogs = result
                commit('receive_blog', blogs)
            }
        },
        async addBlog({ commit },blogs) {
            // 向后台提交用户信息
            let data = JSON.stringify(blogs)
            await reqAddBlog(data)   
        },
        async getBlogById({commit},blogid){
            const result = await reqGetBlogById(blogid) 
            console.log(result);
            
            if(result){
                commit('receive_one_blog', result)
            }
        }
    },
    getters: {
        getBlogs(state){
            return state.blog.reverse()
        }
    }
}
