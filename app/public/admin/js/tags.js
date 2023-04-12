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
			let tag_name = $('#tag_name').val();
			let tag_slug = $('#tag_slug').val();
			let tag_description = $('#tag_description').val();
			$.ajax({
				url: '/admin/tag/create',
				type: 'POST',
				data: { name: tag_name, slug: tag_slug, description: tag_description },
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
});
function rowElement(tag) {
	return `<tr class="level-0">
				<th scope="row" class="check-column">
					<input type="checkbox" name="delete_tags[]" id="cb-select-1" value='${tag.id}'>
				</th>
				<td class="name column-name has-row-actions column-primary" data-colname="Tên">
					<strong>
						<a class="row-title" href="/admin/tag/edit?id=${tag.id}" aria-label="“${tag.name}” (Chỉnh sửa)">${tag.name}</a>
					</strong><br>
					<div class="row-actions">
						<span class="edit">
								<a href="/admin/tag/edit?id=${tag.id}">Chỉnh sửa</a> |
							</span>
							<span class="inline hide-if-no-js">
								<span class="delete"><a href="/admin/tag/delete?id=" class="delete-tag aria-button-if-js"
									role="button">Xóa</a> | </span>
							<span class="view">
								<a href="/tag/${tag.slug}">Xem</a>
							</span>
						</span>
					</div>
					<button type="button" class="toggle-row">
						<span class="screen-reader-text">Hiển thị chi tiết</span>
					</button>
				</td>
				<td class="description column-description">
					${tag.description}
				</td>
				<td class="slug column-slug">
					${tag.slug}
				</td>
			</tr>`;
}
//Validate thêm thẻ mới
$('#addtag').validate({
	rules: {
		tag_name: {
			required: true,
			maxlength: 150,
		},
		tag_slug: {
			required: true,
			maxlength: 150
		}
	},
	messages: {
		tag_name: {
			required: 'Tên thẻ không được để trống',
			maxlength: 'Tên không quá 150 ký tự',
		},
		tag_slug: {
			required: 'Đường dẫn không được để trống',
			maxlength: 'đường dẫn không quá 150 ký tự',
		}
	}
});