import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path= "/ai" element={<Layout></Layout>}>
          <Route index element={<Dashboard></Dashboard>}></Route>
          <Route path= "write-article" element={<WriteArticle/>}></Route>
          <Route path= "blog-titles" element={<BlogTitles/>}></Route>
          <Route path= "generate-images" element={<GenerateImages/>}></Route>
          <Route path= "remove-background" element={<RemoveBackground/>}></Route>
          <Route path= "remove-object" element={<RemoveObject/>}></Route>
          <Route path= "review-resume" element={<ReviewResume/>}></Route>
          <Route path= "community" element={<Community/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App