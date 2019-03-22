<template>
  <div>
    <b-jumbotron>
      <template slot="header">Estimation Tool</template>

      <template slot="lead">
        This is a simple application for the load estimation of tasks
      </template>

      <hr class="my-4" />

      <p>
        To start working you can go to:
      </p>

      <b-button variant="primary" href="#" :to="{name: $routeNames.changeRequests}">Change Requests page</b-button>
    </b-jumbotron>
  </div>
</template>
