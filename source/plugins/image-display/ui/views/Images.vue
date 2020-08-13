<template>
	<v-app>
		<v-content  fluid app>
			<v-container pr-2 pl-2 pt-4>

				<v-card>
					<v-card-text>
						<v-textarea v-model="topic" label="Topic"></v-textarea>
						<v-textarea v-model="message" label="Message"></v-textarea>
					</v-card-text>
				</v-card>
				<v-btn @click="sendIotData(topic,message)">Send message to IoT</v-btn>
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "Images",
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
			if(page === "cmp") {
				this.$router.push("/workspace/images/cmp");
			} else {
				this.$router.push("/workspace/images/cmp1");
			}
		}
	}
});
</script>
