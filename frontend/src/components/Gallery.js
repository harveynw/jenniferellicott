import React, { Fragment, Component } from 'react';
import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';

class GalleryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      currentImage: 0,
      lightboxIsOpen: false
    }

    this.loadImages();
  }

  loadImages = () => {
    fetch('/images')
      .then(response => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        response.json().then(data => {
          this.setState({
            items: data.images.map(this.parseItem)
          });
        });

      }
  )}

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }

  onClose = () => {
    this.setState({
      lightboxIsOpen: false
    });
  }

  gotoPrevious = () => {
		this.setState((prevState) => {
      return {
        currentImage: prevState.currentImage - 1
      }
		});
	}
	gotoNext = () => {
    this.setState((prevState) => {
      return {
        currentImage: prevState.currentImage + 1
      }
		});
	}
	gotoImage = (index) => {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage = () => {
		if (this.state.currentImage === this.state.items.length - 1) return;
		this.gotoNext();
	}

  parseItem(image) {
    let gcd = gcd_two_numbers(image.width, image.height)
    return {
      src: '/images/' + image.filename,
      width: image.width/gcd,
      height: image.height/gcd,
      caption: image.name
    };
  }

  render() {
    return (
      <Fragment>
        <Gallery photos={this.state.items} onClick={this.openLightbox} />
        <Lightbox
         images={this.state.items}
         isOpen={this.state.lightboxIsOpen}
         currentImage={this.state.currentImage}
         onClickImage={this.handleClickImage}
         onClickNext={this.gotoNext}
         onClickPrev={this.gotoPrevious}
         onClickThumbnail={this.gotoImage}
         onClose={this.onClose}
         showThumbnails={true}
         backdropClosesModal={true}
        />
      </Fragment>
    );
  }
}

function gcd_two_numbers(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}


export default GalleryComponent;
