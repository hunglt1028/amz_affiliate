/**
 * Contains logic for deleting and adding tags.
 *
 * For deleting tags it makes a request to the server to delete the tag.
 * For adding tags it makes a request to the server to add the tag.
 *
 * @output wp-admin/js/tags.js
 */

/* global ajaxurl, wpAjax, showNotice, validateForm */

jQuery(function ($) {
	var addingTerm = false;
	$('#submit').on('click', function () {
		var form = $(this).parents('form');

		if (addingTerm) {

			return false;
		}

		addingTerm = true;
		form.find('.submit .spinner').addClass('is-active');
		if (form.valid()) {
			let cat_name = $('#cat_name').val();
			let cat_slug = $('#cat_slug').val();
			let cat_parent = $('#cat_parent').val();
			let cat_description = $('#cat_description').val();
			$.ajax({
				url: '/admin/cat/create',
				type: 'POST',
				data: { name: cat_name, slug: cat_slug, parent_id: cat_parent, description: cat_description },
				success: (res) => {
					addingTerm = false;
					form.find('.submit .spinner').removeClass('is-active');
					if (res.status == 200) {
						$('.no-items').remove();
						$('#ajax-response').empty();
						$('#the-list').prepend(rowElement(res.data));
					} else {
						if (res.error.name == 'SequelizeUniqueConstraintError') {
							$('#ajax-response').html('<div class="error"><p>Tên này đã tồn tại rồi, không dùng được</p></div>');
							
						} else {
							$('#ajax-response').html('<div class="error"><p>Đã xảy ra lỗi '+res.error+'</p></div>');
						}
					}
				},
				error: (err) => {
					addingTerm = false;
					form.find('.submit .spinner').removeClass('is-active');
					$('#ajax-response').html('<div class="error"><p>Đã xảy ra lỗi. Hãy báo với bộ phận phát triển về vấn đề này.</p></div>');
				}
			})
		} else {
			addingTerm = false;
			form.find('.submit .spinner').removeClass('is-active');
		}
		return false;
	});
	$('#update_submit').on('click', function () {
		var form = $(this).parents('form');

		if (addingTerm) {

			return false;
		}

		addingTerm = true;
		form.find('.submit .spinner').addClass('is-active');
		if (form.valid()) {
			let id=$('#id').val();
			let cat_name = $('#cat_name').val();
			let cat_slug = $('#cat_slug').val();
			let cat_parent = $('#cat_parent').val();
			let cat_description = $('#tag_description').val();
			$.ajax({
				url: '/admin/cat/update',
				type: 'POST',
				data: {id:id, name: tag_name, slug: tag_slug, description: tag_description },
				success: (res) => {
					addingTerm = false;
					form.find('.submit .spinner').removeClass('is-active');
					if (res.status == 200) {
						$('#ajax-response').html(`<div class="updated"><p>Cập nhật thành công</p><a href="/admin/tag">← Tới mục Thẻ</a></p></div><p>`);
					} else {
						if (res.error.name == 'SequelizeUniqueConstraintError') {
							$('#ajax-response').html('<div class="error"><p>Tên này đã tồn tại rồi, không dùng được</p></div>');
							
						} else {
							$('#ajax-response').html('<div class="error"><p>'+res.error+'</p></div>');
						}
					}
				},
				error: (err) => {
					addingTerm = false;
					form.find('.submit .spinner').removeClass('is-active');
					$('#ajax-response').html('<div class="error"><p>Đã xảy ra lỗi. Hãy báo với bộ phận phát triển về vấn đề này.</p></div>');
				}
			})
		} else {
			addingTerm = false;
			form.find('.submit .spinner').removeClass('is-active');
		}
		return false;
	});
	$('a.delete').on('click',function(e){
		//ngăn chặn hành động mặc định
		e.preventDefault();

		//Xác nhận người dùng có muốn xóa không
		const delConfirm = confirm('Bạn muốn xóa bản ghi à!');
		//Nếu người dùng xác nhận muốn xóa
		if(delConfirm){
			$('.submit .spinner').addClass('is-active');
			let id = $(this).attr('id');
			let href = $(this).attr('href');
			$.ajax({
				url: href,
				type: 'POST',
				data: {id:id},
				success: (res) => {
					addingTerm = false;
					$('.submit .spinner').removeClass('is-active');
					window.location.href= '/admin/tag';
				},
				error: (err) => {
					addingTerm = false;
					$('.submit .spinner').removeClass('is-active');
					$('#ajax-response').html('<div class="error"><p>Đã xảy ra lỗi. Hãy báo với bộ phận phát triển về vấn đề này.</p></div>');
				}
			})
		}
	});
});
function rowElement(cat) {
	return `<tr class="level-0">
				<th scope="row" class="check-column">
					<input type="checkbox" name="delete_cats[]" id="cb-select-1" value='${cat.id}'>
				</th>
				<td class="name column-name has-row-actions column-primary" data-colname="Tên">
					<strong>
						<a class="row-title" href="/admin/cat/update?id=${cat.id}" aria-label="“${cat.name}” (Chỉnh sửa)">${cat.name}</a>
					</strong><br>
					<div class="row-actions">
						<span class="edit">
								<a href="/admin/cat/update?id=${cat.id}">Chỉnh sửa</a> |
							</span>
							<span class="inline hide-if-no-js">
								<span class="delete"><a href="/admin/tag/delete?id=" class="delete-cat aria-button-if-js"
									role="button">Xóa</a> | </span>
							<span class="view">
								<a href="/cat/${cat.slug}">Xem</a>
							</span>
						</span>
					</div>
					<button type="button" class="toggle-row">
						<span class="screen-reader-text">Hiển thị chi tiết</span>
					</button>
				</td>
				<td class="description column-description">
					${cat.description}
				</td>
				<td class="slug column-slug">
					${cat.slug}
				</td>
			</tr>`;
}
//Validate thêm thẻ mới
$('#addcat').validate({
	rules: {
		cat_name: {
			required: true,
			maxlength: 150,
		},
		cat_slug: {
			required: true,
			maxlength: 150
		}
	},
	messages: {
		cat_name: {
			required: 'Tên chuyên mục không được để trống',
			maxlength: 'Tên chuyên mục quá 150 ký tự',
		},
		cat_slug: {
			required: 'Đường dẫn không được để trống',
			maxlength: 'đường dẫn không quá 150 ký tự',
		}
	}
});