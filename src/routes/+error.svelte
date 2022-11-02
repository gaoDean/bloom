<script>
import { page } from '$app/stores';
</script>

<div class="error-container" style="">
	<div>
		<h1 class="error-status">
			{$page.status}
		</h1>
		<div class="error-msg-container" style="">
			<h2 style="">
				{$page.error.message}
			</h2>
		</div>
	</div>
</div>

<style>
.error-container {
	height: 100vh;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.error-status {
	border-right: 1px solid var(--secondary);
	display: inline-block;
	margin: 0;
	margin-right: 20px;
	padding: 10px 23px 10px 0;
	font-size: 24px;
	font-weight: 500;
	vertical-align: middle;
}
.error-msg-container {
	display: inline-block;
	text-align: left;
	line-height: 49px;
	height: 49px;
	vertical-align: middle;
}
.error-msg-container > h2 {
	font-size: 14px;
	font-weight: normal;
	line-height: inherit;
	margin: 0;
	padding: 0;
}
</style>
