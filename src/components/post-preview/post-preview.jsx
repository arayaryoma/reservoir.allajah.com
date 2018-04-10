import { render, h, Component } from 'preact';
export class PostPreview extends Component {
    render() {
        return (
            <div className='post-preview'>
                <p className={'post-preview-title'}>{this.props.post.title}</p>
            </div>
        )
    }
}