import { __ } from '@wordpress/i18n';
import { RangeControl, Button, PanelBody, Card, CardBody } from '@wordpress/components';
import { InspectorControls, InnerBlocks, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	const onUpdateImage = ( image ) => {
		setAttributes( {
			image: image,
			images_ids: List_Ids( image ),
			list_images: List_Images( image )
		} );
	};

	function List_Ids( image ) {
		let j = [];
		for( let i in image ) {
			j.push( image[i].id );
		}
		return j;
	}

	function List_Images( image ) {
		let j = '<!-- wp:paragraph -->';
		if ( image ) {
			const unique_id = Math.floor( Math.random() * 90000 ) + 10000;
			let slide_interval = '';
			let base = Math.floor( 90 / image.length );
			let base2 = base / 100;
			let flame_1 = '';
			let flame_2 = '';
			for( let k = 0; k < image.length; k++ ) {
				if ( 0 == k ) {
					flame_1 = '0%';
					flame_2 = base + '%';
					slide_interval += flame_1 + '{ left: 0%; } ';
					slide_interval += flame_2 + '{ left: 0%; } ';
				} else {
					flame_1 = base * k + base2 + '%';
					flame_2 = base * k + base + '%';
					slide_interval += flame_1 + '{ left: -' + ( k * 100 ) + '%; } ';
					slide_interval += flame_2 + '{ left: -' + ( k * 100 ) + '%; } ';
				}
			}
			slide_interval += ' 100% { left: 0%; }';
			j += '<style type="text/css">';
			j += '@keyframes slidy' + unique_id + ' { ' + slide_interval + '}';
			j += 'div#slider' + unique_id + ' { overflow: hidden; margin: 0 auto; padding: 0; }';
			j += 'div#slider' + unique_id + ' figure img { width: ' + 100 / image.length + '%; height: auto; float: left; }';
			j += 'div#slider' + unique_id + ' figure { position: relative; width: ' + 100 * image.length + '%; margin: 0; left: 0; text-align: left; font-size: 0; animation: ' + ( attributes.animation * image.length ) + 's slidy' + unique_id + ' infinite; }';
			j += '</style>';
			j += '<div id="slider' + unique_id + '">';
			j += '<figure>';
			for( let i in image ) {
				if ( 0 == i ) {
					j += '<img src="' + image[i].url + '" title="' + image[i].caption + '" alt="' + image[i].alt + '" width="' + image[i].sizes.full.width + '" height="' + image[i].sizes.full.height + '" loading="eager">';
				} else {
					j += '<img src="' + image[i].url + '" title="' + image[i].caption + '" alt="' + image[i].alt + '" width="' + image[i].sizes.full.width + '" height="' + image[i].sizes.full.height + '" loading="lazy">';
				}
			}
			j += '</figure>';
			j += '</div>';
		}
		j += '<!-- /wp:paragraph -->';
		return j;
	}

	attributes.list_images = List_Images( attributes.image );

	const { preview } = attributes;
	if ( preview ) {
		return (
			<div className="simple-block-gallery-block-preview">
				<img src = { simple_block_gallery_preview_slider.url } alt="Preview" />
			</div>
		);
	}

	const media_upload = [];
	media_upload.push(
		<div className="simple-block-gallery-block-placeholder">
			{ ! attributes.images_ids && (
				<>
					<div><strong>Simple Block Gallery</strong></div>
					<div>{ __( 'Slider block', 'simple-block-gallery' ) }</div>
					<div>{ __( 'Add your gallery here.', 'simple-block-gallery' ) }</div>
				</>
			) }
			<MediaUploadCheck>
				<MediaUpload
					title = { __( 'Slider block', 'simple-block-gallery' ) }
					onSelect = { onUpdateImage }
					allowedTypes = 'image'
					gallery = { true }
					multiple = { true }
					value = { attributes.images_ids }
					render = { ( { open } ) => (
						<Button
							variant = "secondary"
							onClick={ open }>
							{ ! attributes.images_ids ? __( 'Create Gallery', 'simple-block-gallery' ) : __( 'Update gallery', 'simple-block-gallery' ) }
						</Button>
					) }
				/>
			</MediaUploadCheck>
		</div>
	);

	return (
		<div { ...blockProps }>
			<RawHTML>{ attributes.list_images }</RawHTML>
			{ media_upload }
			<InspectorControls>
				<PanelBody title = { __( 'Settings', 'simple-block-gallery' ) } initialOpen = { true }>
					{ media_upload }
					<hr />
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label = { __( 'Interval', 'simple-block-gallery' ) }
						max = { 30 }
						min = { 1 }
						value = { attributes.animation }
						onChange = { ( value ) => setAttributes( { animation: value } ) }
					/>
					<Card>
						<CardBody>{ __( 'If there is a caption, a tooltip will appear on mouseover.', 'simple-block-gallery' ) }</CardBody>
					</Card>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
