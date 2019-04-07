<template>
	<div>
		<b-jumbotron bg-variant="light" text-variant="black" border-variant="light">
		<template slot="header">Estimation Tool</template>

		<template slot="lead">
			{{ $t("message.hello_message") }}
		</template>

		<hr class="my-4" />

		<p>{{ $t("message.start_work") | ucfirst}}</p>

		<b-button variant="primary" href="#" :to="{name: $routeNames.changeRequests}">
			{{ $t("message['change requests']") | ucfirst }}</b-button>
		</b-jumbotron>
	</div>
</template>
