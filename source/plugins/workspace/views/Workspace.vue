<template>
	<v-app>
		<v-app-bar app  dark color="deep-purple accent-4" scroll-target="#scrolling-techniques-6">
			<v-toolbar-title link contain justify-center>
				SmartHome Dashboard
			</v-toolbar-title> 
		</v-app-bar>
		<v-content  fluid app>
			<v-container pr-2 pl-2 pt-4>
				<router-view>

				</router-view>
			</v-container>
		</v-content>
		<v-bottom-navigation
			v-model="bottomNav"
		>
			<v-btn @click="changePage('images')" value="images">
				<span>Images</span>
				<v-icon>mdi-image</v-icon>
			</v-btn>

			<v-btn @click="changePage('videos')" value="videos">
				<span>Dashboard</span>
				<v-icon>mdi-gauge</v-icon>
			</v-btn>

			<v-btn @click="changePage('postdata')" value="postdata">
				<span>Controllers</span>
				<v-icon>mdi-thermometer-plus</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</v-app>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({
	name: "Workspace",

	async mounted(){
		setInterval(async() => {
			try {
				let response = await this.ui.application.api.get("/api/v1/get/data/iot");
				
				if(response.status === 200) {
					this.iotData = response.data;
				} else {	
					console.error("Cannot get data");
				}
			} catch (error) {
				console.error(error);
			}
		},60000 * 5)
		
	},
	watch: {
		
	},
	data() {
		return {
			bottomNav: "images",
			iotData:{},
			topic:"",
			message:"",
			fan:false
		};
	},
	computed: {
		
	},
	methods: {
		async sendIotData(topic:string,message:string) {
			try {
				if(topic === "ipw/diana/commands" && message === "led_off") {
					this.fan = false;
				} else if (topic === "ipw/diana/commands" && message === "led_on") {
					this.fan = true;
				}
				
				let response = await this.ui.application.api.post("/api/v1/send/data/iot", {
					message:message,
					topic:topic
				})
				if(response.status !== 200) {
					console.error("Could not send message");
				}
			} catch (e) {
				console.error(e);
			}
		},
		changePage(page:string) {
			switch (page) {
				case "images":
					this.$router.push("/workspace/images");
					/// Thiss will add to <<ip address>>:6969/ the images path
					// <<ip address>>:6969/ => <<ip address>>:6969/images
					// <<ip address>>:6969/<<AnyOtherPage>> => <<ip address>>:6969/images
					break;
				case "videos":
					this.$router.push("/workspace/videos");
					/// Thiss will add to <<ip address>>:6969/ the videos path
					// <<ip address>>:6969/ => <<ip address>>:6969/videos
					// <<ip address>>:6969/<<AnyOtherPage>> => <<ip address>>:6969/videos
					break;
				case "postdata":
					this.$router.push("/workspace/postdata");
					/// Thiss will add to <<ip address>>:6969/ the workspace path
					// <<ip address>>:6969/ => <<ip address>>:6969/workspace
					// <<ip address>>:6969/<<AnyOtherPage>> => <<ip address>>:6969/workspace
					break;
			}
		}
		
	}
});
</script>
