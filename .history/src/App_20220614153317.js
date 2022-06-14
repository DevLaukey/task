import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import data from "./data";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import Content from "./Components/content/Content";
import Bookmark from "./Components/content/Bookmark";
import NewStory from "./Components/posts/NewStory";
import SinglePost from "./Components/posts/SinglePost";
import Login from "./Components/login/Login";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: data,
      token: JSON.parse(localStorage.getItem('token')),
    };

    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleBookmark(data) {
    let posts = this.state.posts;
    posts = posts.map((post) =>
      post === data
        ? {
            id: post.id,
            title: post.title,
            body: post.body,
            path: post.path,
            isVideo: post.isVideo,
            bookmark: true,
          }
        : post
    );
    this.setState({ posts });
  }
  
  handleLogin() {
   
    return localStorage.setItem('token', JSON.stringify({logged:true}));
  
  }
  handleRemoveBookmark(data) {
    let posts = this.state.posts;
    posts = posts.map((post) =>
      post === data
        ? { id: post.id, title: post.title, body: post.body, bookmark: false }
        : post
    );
    this.setState({ posts });
  }

  handleSubmission(data) {
    let posts = this.state.posts;
    posts = [data, ...posts];
    this.setState({ posts });
  }

  handleRemove(post, history) {
    let posts = this.state.posts;
    posts = posts.filter((onepost) => onepost !== post);
    this.setState({ posts });
    history.push("/");
    this.handleWindow();
  }

  handleWindow() {
    window.scrollTo(0, 0);
  }
  render() {
    if (this.state.token) {
      return <Login handleLogin={this.handleLogin()} />
        ;
    }
    {
      return (
        
        <Router basename="/react-mini-blog">
          <div className="App">
            <Route path="*" render={(props) => <Header {...props} />} />
            <Route
              exact
              path="/"
              render={() => (
                <Content
                  posts={this.state.posts}
                  bookmarks={this.state.posts.filter((post) => post.bookmark)}
                  handleBookmark={this.handleBookmark}
                  handleRemoveBookmark={this.handleRemoveBookmark}
                />
              )}
            />
            <Route
              exact
              path="/new"
              render={() => (
                <NewStory handleSubmission={this.handleSubmission} />
              )}
            />
            <Route
              exact
              path="/bookmark"
              render={() => (
                <Bookmark
                  bookmarks={this.state.posts.filter((post) => post.bookmark)}
                />
              )}
            />
            <Route
              exact
              path="/post/:id"
              render={(props) => (
                <SinglePost
                  {...props}
                  posts={this.state.posts}
                  handleBookmark={this.handleBookmark}
                  handleRemoveBookmark={this.handleRemoveBookmark}
                  handleRemove={this.handleRemove}
                  handleWindow={this.handleWindow()}
                />
              )}
            />

            <Footer />
          </div>
        </Router>
      );
    }
  }
}
