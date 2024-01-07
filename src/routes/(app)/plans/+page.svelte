<script lang="ts">
	export let data;
</script>

<div class="mt-16 flex gap-3 text-white">
	<!-- Overhaul like fr
	{#each data.allPlans as plans}
		<div class=" w-72 bg-black">
			<div>
				<p>{plans.unit_amount === 0 ? 'Free Tier' : 'Pro Plan'}</p>
				<p>
					{plans.unit_amount && plans?.unit_amount / 100} INR
				</p>
			</div>
			<div>
				{#if plans.unit_amount === 0}
					<button disabled>Free</button>
				{:else if data.userData?.stripeCustomerId && data.userData.status === 'active'}
					<form action="" method="POST">
						<button>You are a Pro</button>
					</form>
				{:else} -->
	<form action="" method="POST">
		<input type="text" value={data.allPlans[0].id} name="priceId" hidden class="hidden" />
		<button>Become a Pro</button>
	</form>
	<!-- {/if}
			</div>
            {/each}
        </div> -->
</div>
